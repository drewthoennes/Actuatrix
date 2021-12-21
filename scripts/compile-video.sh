outputName="output.mp4"
dimensions="2194x1904"
fps=60
frameName="%07d.png"
crf=10

ffmpeg -r $fps -f image2 -s $dimensions -i $frameName -vcodec libx264 -crf $crf  -pix_fmt yuv420p $outputName