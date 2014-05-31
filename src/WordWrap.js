WRAP = {

    /*  Converts flowing text to fixed width text
    
        PARAMS:
        * text - flowing text.
        * width - integer char width of a line of fixed width text, including
          length of prepend
        * prepend - String is used to prepend text with a particular variable
          such as double slashes (//) for comments
    */
    flow_to_fixed: function(text, width, prepend) {

        // Set prepend to blank string if undefined to make
        // concatenation easier
        prepend = prepend || ""

        // Split by paragraph first, after making newlines uniform
        text = text.replace(/\r?\n|\r/g, "\n");
        var paragraphs = text.split("\n")

        // Array of new fixed width paragraphs
        var newParagraphs = new Array()

        // Iterate over each paragraph
        numParagraphs = paragraphs.length
        for (var i = 0; i < numParagraphs; i++) {
            var newParagraph = WRAP.flow_to_fixed_paragraph(paragraphs[i],
                                                            width,
                                                            prepend)
            newParagraphs.push(newParagraph)
        }

        // Join paragraphs together with new line and return
        return newParagraphs.join("\n")
    },

    // Same as above, but just for one paragraph
    flow_to_fixed_paragraph: function(text, width, prepend) {

        // Array of all fixed width lines
        var allLines = new Array()

        // String representing current line
        var currentLine = new String()

        // Go through words and add to lines one by one
        var words = text.split(" ")
        var wordsLength = words.length
        for (var i = 0; i < wordsLength; i++) {
            var word = words[i]

            // Create new line if this will put us over length limit
            if (currentLine.length + 1 + word.length > width) {
                allLines.push(currentLine)
                currentLine = new String()
            }
             
            if (currentLine.length == 0) { // First word of line
                // Add prepend if necessary
                currentLine += prepend
                // Also add word automatically without space since
                // it's the first word
                currentLine += word
            
            } else { // Second plus word of line
                // Add space before next word
                currentLine += " "
                currentLine += word
            }
        }

        // Don't forget the last line
        allLines.push(currentLine)

        // Join lines together with newline character
        return allLines.join("\n")
    },


    /*  Converts fixed width text to flowing text - preserves 
    
        PARAMS:
        * text - fixed text.
        * prepend - String that was used to prepend text with a particular
          variable such as double slashes (//) for comments
    */
    fixed_to_flow: function(text, prepend) {
        // Set prepend to blank string if undefined to make
        // concatenation easier
        prepend = prepend || ""

        // Make newlines uniform
        text = text.replace(/\r?\n|\r/g, "\n");

        // Array of new flowing text lines (e.g. a paragraph)
        var allLines = new Array()

        // Array representing current lines to join together in a paragraph
        var currentLines = new Array()

        // Go through each line and create 
        var lines = text.split("\n")
        var linesLength = lines.length
        for (var i = 0; i < linesLength; i++) {
            var line = lines[i]

            // Get rid of prepend if applicable
            if (prepend && line.startsWith(prepend)) {
                line = line.slice(prepend.length)
            }

            // If empty line, push prior paragraph and then save an extra
            // blank line to demarcate paragraphs
            if (line.trim() == "") {
                currentParagraph = currentLines.join(" ")
                allLines.push(currentParagraph)
                allLines.push("")
                currentLines = new Array()

            // Else add line to list
            } else {
                currentLines.push(line)
            }
        }

        // Don't forget the last line
        currentParagraph = currentLines.join(" ")
        allLines.push(currentParagraph)

        // Join lines together with newline character
        return allLines.join("\n")
    },

    /*  Function pulls #text_input data and transforms it to fixed text using
        values in text fields
    */
    flow_to_fixed_button: function() {
        try {
            // Get input values
            text = $("#text_input").val()
            width = $("#fixed_width").val()
            prepend = $("#prepend").val()

            // Sanity check
            if (isNaN(width)) {
                throw "Not a width"
            }
            if (prepend.length > parseInt(width)) {
                throw "Prepend too long"
            }

            // Call conversion function and set in output textarea
            output = WRAP.flow_to_fixed(text, width, prepend)
            $("#text_output").val(output)
            $("#text_output").attr("cols", width).trigger('autosize.resize')

        } catch(err) {
            // TODO: Better error handling
            alert(err)
        }
    },

    /*  Function pulls #text_input data and transforms it to flowing text using
        values in text fields
    */
    fixed_to_flow_button: function() {
        try {
            // Get input values
            text = $("#text_input").val()
            prepend = $("#prepend").val()

            // Call conversion function and set in output textarea
            output = WRAP.fixed_to_flow(text, prepend)
            $("#text_output").val(output)
            $("#text_output").attr("cols", 80).trigger('autosize.resize')

        } catch(err) {
            // TODO: Better error handling
            alert(err.message)
        }
    }
}

// jQuery binding
$(document).ready(function() {
    $("#to_fixed_btn").click(WRAP.flow_to_fixed_button)
    $("#to_flow_btn").click(WRAP.fixed_to_flow_button)
    $('#text_input').autosize();
    $('#text_output').autosize();
})