describe("WRAP.flow_to_fixed", function() {

  var testString = ("alpha beta charlie delta echo foxtrot golf hotel " +
      "india juliet kilo lima mike november oscar papa quebec " +
      "romeo sierra tango uniform victor xray whiskey yankee zulu")


  it("should be able to split flowing text into fixed lines", function() {

    var expectedOuput = [
      "alpha beta charlie",
      "delta echo foxtrot",
      "golf hotel india",
      "juliet kilo lima",
      "mike november oscar",
      "papa quebec romeo",
      "sierra tango uniform",
      "victor xray whiskey",
      "yankee zulu"
    ].join("\n")

    var output = WRAP.flow_to_fixed(testString, 20)
    expect(output).toEqual(expectedOuput);
  });


  it("should be able to insert a prepend at the start of each line",
  function() {

    var expectedOuput = [
      "  # alpha beta",
      "  # charlie delta",
      "  # echo foxtrot",
      "  # golf hotel india",
      "  # juliet kilo lima",
      "  # mike november",
      "  # oscar papa",
      "  # quebec romeo",
      "  # sierra tango",
      "  # uniform victor",
      "  # xray whiskey",
      "  # yankee zulu"
    ].join("\n")

    var output = WRAP.flow_to_fixed(testString, 20, "  # ")
    expect(output).toEqual(expectedOuput);
  });


  describe("when dealing with multiple paragraphs", function() {

    var testString = ("alpha beta charlie delta echo foxtrot golf hotel\n\n" +
          "india juliet kilo lima mike november oscar papa quebec\n\n" +
          "romeo sierra tango uniform victor xray whiskey yankee zulu")


      it("should be able to split flowing text into fixed lines", function() {

        var expectedOuput = [
          "alpha beta charlie",
          "delta echo foxtrot",
          "golf hotel",
          "",
          "india juliet kilo",
          "lima mike november",
          "oscar papa quebec",
          "",
          "romeo sierra tango",
          "uniform victor xray",
          "whiskey yankee zulu"
        ].join("\n")

        var output = WRAP.flow_to_fixed(testString, 20)
        expect(output).toEqual(expectedOuput);
      });


      it("should be able to insert a prepend at the start of each line",
      function() {

        var expectedOuput = [
          "  # alpha beta",
          "  # charlie delta",
          "  # echo foxtrot",
          "  # golf hotel",
          "  # ",
          "  # india juliet",
          "  # kilo lima mike",
          "  # november oscar",
          "  # papa quebec",
          "  # ",
          "  # romeo sierra",
          "  # tango uniform",
          "  # victor xray",
          "  # whiskey yankee",
          "  # zulu"
        ].join("\n")

        var output = WRAP.flow_to_fixed(testString, 20, "  # ")
        expect(output).toEqual(expectedOuput);
      });

  });

});


//////////////


describe("WRAP.fixed_to_flow", function() {

  var expectedOuput = ("alpha beta charlie delta echo foxtrot golf hotel " +
      "india juliet kilo lima mike november oscar papa quebec " +
      "romeo sierra tango uniform victor xray whiskey yankee zulu")

  it("should be able to reflow split text into flowing lines", function() {

    var testString = [
      "alpha beta charlie",
      "delta echo foxtrot",
      "golf hotel india",
      "juliet kilo lima",
      "mike november oscar",
      "papa quebec romeo",
      "sierra tango uniform",
      "victor xray whiskey",
      "yankee zulu"
    ].join("\n")

    var output = WRAP.fixed_to_flow(testString)
    expect(output).toEqual(expectedOuput)
  });


  it("should be able to remove preprends while reflowing",
  function() {

    var testString = [
      "  # alpha beta",
      "  # charlie delta",
      "  # echo foxtrot",
      "  # golf hotel india",
      "  # juliet kilo lima",
      "  # mike november",
      "  # oscar papa",
      "  # quebec romeo",
      "  # sierra tango",
      "  # uniform victor",
      "  # xray whiskey",
      "  # yankee zulu"
    ].join("\n")

    var output = WRAP.fixed_to_flow(testString, "  # ")
    expect(output).toEqual(expectedOuput)
  });


  describe("when dealing with multiple paragraphs", function() {

    var expectedOuput = (
        "alpha beta charlie delta echo foxtrot golf hotel\n\n" +
          "india juliet kilo lima mike november oscar papa quebec\n\n" +
          "romeo sierra tango uniform victor xray whiskey yankee zulu")


      it("should be able to reflow split text into flowing lines", function() {

        var testString = [
          "alpha beta charlie",
          "delta echo foxtrot",
          "golf hotel",
          "",
          "india juliet kilo",
          "lima mike november",
          "oscar papa quebec",
          "",
          "romeo sierra tango",
          "uniform victor xray",
          "whiskey yankee zulu"
        ].join("\n")

        var output = WRAP.fixed_to_flow(testString, 20)
        expect(output).toEqual(expectedOuput);
      });


      it("should be able to remove preprends while reflowing",
      function() {

        var testString = [
          "  # alpha beta",
          "  # charlie delta",
          "  # echo foxtrot",
          "  # golf hotel",
          "  # ",
          "  # india juliet",
          "  # kilo lima mike",
          "  # november oscar",
          "  # papa quebec",
          "  # ",
          "  # romeo sierra",
          "  # tango uniform",
          "  # victor xray",
          "  # whiskey yankee",
          "  # zulu"
        ].join("\n")

        var output = WRAP.fixed_to_flow(testString, "  # ")
        expect(output).toEqual(expectedOuput);
      });

  });

});

