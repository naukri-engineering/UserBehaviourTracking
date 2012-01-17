tnm.js
==

1. A plugin that solves undermentioned purposes:
 1. Track user behaviour.
 2. Values filled on fields.
 3. Click(s) on links / radio / checkboxes.
 4. Log time spent by a user on the form / page.
 5. Identify common validation error(s) encountered by the user while filling a
form / page.
 6. Identify key exit point(s)
2. A solution that integrates with the form / page seamlessly.
3. Capture & Send user behaviour to the server for logging & analysis.

FEATURES
--
* Pluggable / Configurable
* Lightweight
* Field Targeting
* Tracking of User Behaviour
 * Fields visited by the user.
 * Order of field traversal.
 * Time spent on each field.
 * Values filled in each field.


USAGE
--
* Include script in your html/tpl

        <script type=”text/javascript” src=”tnmplugin.js”></script>

* Create an object of tnm class, just before the closing `</body>` tag

        var objtnm = new tnm();

* The plugin have some configuration variables, which can be specified in following manner:
  * tnmLogPath: Path to the script which would log the data captured by the plugin.
  
              objtnm.tnmLogPath = “savelog.php”

             <?php
                $log = $_POST['log'];
                $fileName = <PATH_TO_LOG_FILE>
                $fph = fopen($fileName, "a+");
                $logstr = $log."\n";
                fputs($fph, $logstr);
                fclose($fph);
             ?>
             
  * tnmLogArray: Specify the variables to be captured i.e. value / error
   
               objtnm.tnmLogArray={“value”:true, “error”:false, “links”:false}  

      * Setting value to true would also log values of the fields in the form / page, along
with the time and motion data.
      * Setting error to true would also also errors of the fields in the form / page, along with
the time and motion data.
      * Setting links to true would start capturing clicks on the links in the form / page,
along with the time and motion data.
  * tnmLogFields: This can be used to target certain fields for logging data.
 
TODO
---
1. Capture Page Load times.
2. Add Log Parsing / Report Generation Script(s).
3. Configure pushing of data at the defined interval(s), instead of on page unload.

CONTRIBUTORS
---
* Ajay Sharma
* Pulkit Swarup

CONTACT US
---

engineering[at]naukri.com
LICENSE
---

Copyright(c) 2012 Naukri.com

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.