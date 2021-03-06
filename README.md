word-wrapper
============

Word Wrapper is a simple app that converts fluid text into fixed-width (e.g. 80 character) text and back. It supports the following features:

* Custom Character Widths - In case you're not a fan of 80 char limits
* Prepending - Inserts a prepended string at the beginning of each line (e.g. a "# " or "// " at the beginning of each line for comments). The prepended string can also be removed when converting back from fixed width text.
* Paragraphs - Paragraphs should be denoted by double newlines. Word Wrapper should respect and preserve this when converting.

[Index.html](http://fongandrew.github.io/word-wrapper/index.html) can be used to access the app. [SpecRunner.html](http://fongandrew.github.io/word-wrapper/SpecRunner.html) contains some simple tests to check the conversion scripts.
