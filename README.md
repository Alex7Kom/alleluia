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

## Pipelines

An alleluia workflow consists of one or several pipelines, each pipeline runs pipes on its own set of data and saves the final results with the name of the pipeline. Those results may later be loaded and processed by other pipelines.
There are several types of pipes, such as `pipe`, `filter`, `data`, and `tee`.

The `data` pipe is used to load saved results of pipelines, while `tee` is a concept similar to map-reduce.
Alleluia passes to a generic `pipe` data, pipe settings, alleluia config, set of filters and a callback function, to which the pipe should pass the results of its work.
`filter` is a simple function that accepts a string, transforms it and outputs the resulting string. Alleluia runs a given filter against given property of each object in pipeline's data set. Also stock `renderTemplate` pipe binds all loaded filters to swig template engine so the filters can be used in templates.

A basic pipeline looks like this:

```
{
  "name": "posts",
  "pipes": [
    { "pipe": "loadPosts" }
  ]
}
```

This pipeline uses `loadPosts` pipe to load posts and does nothing more. Actually it does one more thing: caches the loaded data so it can be used later.

TODO: more on pipelines

## Stock pipes

TODO

## Stock filters

TODO

## License

MIT