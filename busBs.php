<!DOCTYPE html>
<html lang="da">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ruteplan</title>
        <meta charset="UTF-8">
        <meta content="no-cache">
        <meta http-equiv="refresh" content="86400">
        <title>SOP - infotavlen</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
        <link href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@300&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="custom.css">

    </head>
    <body style="background-color: #00788a;">
        <div class="col bus">
            <table id="tbl-bus-info">
                <thead class="thead">
                    <tr>
                        <th id="header" colspan="3"><h3 style="padding-top:0;">Billedskærevej Afgangstavlen</h3></th>
                    </tr>
                    <tr>
                        <th>Rute</th>
                        <th>Til</th>
                        <th>Næste</th>
                    </tr>
                </thead>
                <tbody data-bind="foreach:vm.theBuses() ">
                    <tr data-bind="attr:{'class': type}">
                        <td><span data-bind="text:name"></span></td>
                        <td style="text-align: left;padding-left: 20px;"><span data-bind="text:direction"></span></td>
                        <td style="text-align: left;padding-left: 20px;"><span data-bind="text:time"></span><span
                                data-bind="ifnot: delay === 0"> +<span data-bind="text:delay"></span></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
        <script src="js/knockout-3.5.0.js" type="text/javascript"></script>
        <script src="js/customsBs.js?v=3" charset="UTF-8"></script>

    </body>
</html>
