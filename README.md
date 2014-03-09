# Alleluia

Alleluia is a static site generator. It is intended to be fast, simple, extensible, and moddable.
Alleluia uses the concept of pipelines where input data goes through a series of functions (pipes) with standardized inputs and outputs that transforms the data.
Alleluia comes with basic set of pipes but you can write and use your own pipes that fit your needs better.
While Alleluia uses an async-like workflow most of the I/O is synchronious. Sync I/O is much faster when we need to read/write many files in a row while async structure of Alleluia allows to use any async functions.

## Installation

The easiest way to install Alleluia is using `npm`:

    npm install -g git://github.com/Alex7Kom/alleluia.git

You need to have [Node.js](http://nodejs.org) installed beforehand.

## Get started

Clone or download [this sample project](https://github.com/Alex7Kom/alleluia-sample-project).

The only required part of any Alleluia project is `alleluia.json` config file. It contains all information about your project as well as pipelines that Alleluia runs for your project.

To compile a project, just run `alleluia` (if you have installed Alleluia globally) in the project directory.

## Pipes

TODO

## License

MIT