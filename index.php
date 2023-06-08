<?php
date_default_timezone_set("Europe/Copenhagen");
$time = date("H:i");
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
    </head>
    <body>        
        <!-- MUNKEBJERGVEJ -->
        <div id="bus1" style="height: calc(100% - 218px); display: block;">
            <iframe id="iframe1" scrolling="no" src="busMb.php" title="Afgangstavle"></iframe>
        </div>

        <!-- BILLEDSKÆRERVEJ -->
        <div id="bus2" style="height: calc(100% - 218px); display: none;">
            <iframe id="iframe2" scrolling="no" src="busBs.php" title="Afgangstavle"></iframe>
        </div>

        <script>
            $(document).ready(function ()
            {
                const mb = document.getElementById("munkebjergvej");
                const bs = document.getElementById("billedskaerer");

                var check_time_to_toggle = setInterval(compareTime, 10000, '12:10', '16:20');

                function compareTime(start, end) {
                    var currentDate = new Date();
                    var startH = start.split(":")[0];
                    var startM = start.split(":")[1];
                    var endH = end.split(":")[0];
                    var endM = end.split(":")[1];
                    var startHourD = new Date().setHours(startH, startM, 0);
                    var endHourD = new Date().setHours(endH, endM, 0);

                    if ((currentDate >= startHourD && currentDate < endHourD)) {
                        if (mb.style.display === 'block') {
                            mb.style.display = 'none';
                            bs.style.display = 'block';
                        } else {
                            mb.style.display = 'block';
                            bs.style.display = 'none';
                        }
                    } else {
                        mb.style.display = 'block';
                        bs.style.display = 'none';
                    }
                }
            });
        </script>
    </body>
</html>