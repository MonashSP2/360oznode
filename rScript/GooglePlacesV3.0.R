library(googleway)
library(data.table)
library(parallel)
library(rjson)

#Start Clock
st<-Sys.time()

#Initialising Cores
cores<-detectCores()
clust <- makeCluster(cores)

set_key = "AIzaSyDcZJ9q_FqYWREJMTTBXvlGuOdrTjkU_K4"

search = "Chinese Restaurants"
loc <- c(-37.8840, 145.0266)
rad = 1500

#Getting PlaceID from Google Places API
df1 <- google_places(search_string = search ,location = loc, radius = rad,key=set_key, language = "en")
Sys.sleep(2)
df2 <- google_places(search_string = search ,location = loc, radius = rad, page_token = df1$next_page_token,key=set_key,language = "en")
Sys.sleep(2)
df3 <- google_places(search_string = search ,location = loc, radius = rad, page_token = df2$next_page_token,key=set_key,language = "en")

#Creating Data Frame for first page
df_frame <- data.frame(
  Name = df1$results$name,
  Location = df1$results$geometry$location,
  PlaceID = df1$results$place_id)

#Creating Data Frame for second page
df_frame_next <- data.frame(
  Name = df2$results$name,
  Location = df2$results$geometry$location,
  PlaceID = df2$results$place_id)

#Creating Data Frame for third page
df_33 <- data.frame(
  Name = df3$results$name,
  Location = df3$results$geometry$location,
  PlaceID = df3$results$place_id)

#Merging all the data
df_final <- rbind(df_frame,df_frame_next, df_33)

#Getting Place Details for Google Place Details API
clusterExport(clust, "df_final")
clusterEvalQ(clust, library(googleway))

#Merging all parameters returned from the API (columns)
test<-parLapply(clust,1:nrow(df_final), 
                function(x) 
                  (google_place_details(place_id = paste(df_final[x,"PlaceID"]), key = "AIzaSyDcZJ9q_FqYWREJMTTBXvlGuOdrTjkU_K4")$result))

test2 <- lapply(1:length(test), function(x) 
  stats::setNames(
    cbind(
      test[[x]][c('formatted_address')], 
      test[[x]][c('formatted_phone_number')],
      test[[x]][c('place_id')],
      test[[x]][c('rating')],
      test[[x]][c('website')],
      test[[x]][c('types')]
    )
    ,c("Address","ContactNumber", "PlaceID", "Rating", "Website", "Types")))

#Merging all data in one dataframe (rows)
test3<-rbindlist(lapply(test2, as.data.table))
names(test3)<- c("Address","ContactNumber", "PlaceID", "Rating", "Website", "Types")

#Creating final dataframe for all the data
df_final<-cbind(df_final, test3)
#df_final$Name <- str_replace(df_final$Name, "\\<.*\\>", "")

#Removing Chinese headers
df_final$Name <- iconv(df_final$Name, "", "ASCII", "byte")
df_final$Name <- str_replace_all(as.character(df_final$Name), "\\<.*\\>", "")

drops <- c("PlaceID")
df_final <- df_final[ , !(names(df_final) %in% drops)]

#Stopping parallel processing
stopCluster(clust)

#Convert data to JSON
FinalJson <- toJSON(unname(split(df_final, 1:nrow(df_final))))
cat(FinalJson)

#Stop Clock
en<-Sys.time()
en-st

