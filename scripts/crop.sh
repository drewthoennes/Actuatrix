fileName="$1"
outputFileName="cropped-$fileName"

# The desired dimensions of the output
width=2126
height=2126

# The top left corner of the crop
origin_x=729
origin_y=0

ffmpeg -i $fileName -filter:v "crop=$width:$height:$origin_x:$origin_y" $outputFileName