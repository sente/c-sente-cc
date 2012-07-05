    {
        echo -ne "Vote#\tVote\tRolling Sum\tRolling Avg\t(Rolling Avg)/2 <--- CORRECT ANSWER\n";
        grep _number /var/log/apache2/vhost_access.log{,.1} |  cut -f2,8 -d' ' | grep -v 67.208.188.214 | tr '?' '&' | tr ' ' '\t' | tr '&' '\t' | sed 's/\tb=.*//' | sed 's/a=//' | cut -f1,3 | cut -f2 | grep -E '[0-9]' | awk '$1<100 && $1>=0' | awk '$1<100{sum+=$1; print NR"\t"$1"\t"sum"\t"sum/NR"\t"sum/NR/2}'
        echo -ne "\t\t\t\t^---correct answer\n"
    } | /home/stu/bin/columnate.awk -F'\t'



