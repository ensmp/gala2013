#!/bin/bash
i=1;
for j in *-01.png; do
mv $j $i.png;
i=$(($i+1));
done;
