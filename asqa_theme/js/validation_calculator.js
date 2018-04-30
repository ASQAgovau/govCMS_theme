(function($, Drupal, window, document, undefined) {
  Drupal.behaviors.validationCalculator = {
    attach: function(context, settings) {
      console.log('Calculator Here');
      // This is our calculator
      var calcForm = '<div class="validation-sample-size-calculator"> \
        <form name="sample-size-calculator"> \
          <div class="form-item"> \
            <label for="population">Number of assessment judgements</label> \
            <input type="number" accesskey="P" id="population" name="population" size="6" value="100"> \
          </div> \
          <div class="form-item"> \
            <label for="margin">Error level (%)</label> \
            <input type="number" accesskey="M" id="margin" name="margin" size="4" value="15"> \
          </div> \
          <div class="form-item"> \
            <label for="confidence">Confidence level (%)</label> \
            <input type="number" accesskey="C" id="confidence" name="confidence" size="4" value="95"> \
          </div> \
          <div class="form-item"> \
            <div class="output"> \
              <div class="sample-output"> \
                <span class="sample-title">Sample size:</span> \
                <div id="sample"><b>31</b></div> \
              </div> \
            </div> \
          </div> \
        </form> \
      </div>';

      // Now we place it where we want
      $( "#validation-calculator" ).replaceWith( calcForm );

      // The calculation helpers
      $("#confidence, #margin, #population").change(function(){
        DoCalculate();
      });

      $("#confidence, #margin, #population").on('keyup', function() {
        DoCalculate();
      });

      $("#sample").click(function() {
        DoCalculate();
      })

      // Originally created by:
      // Shanti R Rao and Potluri M Rao, "Sample Size Calculator",
      // Raosoft Inc., 2009, http://www.raosoft.com/samplesize.html

      // You can derive these formulas from first principles. The
      // ProbCriticalNormal function is adapted from an algorithm published
      // in Numerical Recipes in Fortran.

      function ProbCriticalNormal(P) {
          //      input p is confidence level convert it to
          //      cumulative probability before computing critical

          var Y, Pr, Real1, Real2, HOLD;
          var I;
          var PN = [0,    // ARRAY[1..5] OF REAL
                  -0.322232431088,
                   -1.0,
                   -0.342242088547,
                   -0.0204231210245,
                   -0.453642210148E-4];

          var QN = [0,   //  ARRAY[1..5] OF REAL
                  0.0993484626060,
                   0.588581570495,
                   0.531103462366,
                   0.103537752850,
                   0.38560700634E-2];

          Pr = 0.5 - P / 2; // one side significance

          if (Pr <= 1.0E-8) HOLD = 6;
          else {
              if (Pr == 0.5) HOLD = 0;
              else {
                  Y = Math.sqrt(Math.log(1.0 / (Pr * Pr)));
                  Real1 = PN[5]; Real2 = QN[5];

                  for (I = 4; I >= 1; I--) {
                      Real1 = Real1 * Y + PN[I];
                      Real2 = Real2 * Y + QN[I];
                  }

                  HOLD = Y + Real1 / Real2;
              } // end of else pr = 0.5
          } // end of else Pr <= 1.0E-8

          return HOLD;
      }  // end of CriticalNormal

      function SampleSize(margin, confidence, response, population) {
          pcn = ProbCriticalNormal(confidence / 100.0);
          d1 = pcn * pcn * response * (100.0 - response);
          d2 = (population - 1.0) * (margin * margin) + d1;
          if (d2 > 0.0)
              return Math.ceil(population * d1 / d2);
          return 0.0;
      }

      function MarginOfError(sample, confidence, response, population) {
          var pcn = ProbCriticalNormal(confidence / 100.0);
          d1 = pcn * pcn * response * (100.0 - response);
          d2 = d1 * (population - sample) / (sample * (population - 1.0))
          if (d2 > 0.0)
              return Math.sqrt(d2);
          return 0.0;
      }

      function DoCalculate() {
          var margin = $("#margin").val();
          var confidence = $("#confidence").val();
          var response = 50; //$("#response").val();
          var population = $("#population").val();

          var ss = SampleSize(Number(margin),
                  Number(confidence),
                  Number(response),
                  Number(population));

          document.getElementById('sample').innerHTML = ('<b>' + Math.ceil(ss).toString() + '</b>');
          return true;
      }

    }
  }
})(jQuery, Drupal, this, this.document);
