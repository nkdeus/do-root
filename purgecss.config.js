// define extractor class


module.exports = {
    content: ['index.html','js/index.js'],
    css: ['css/style.css'],
    keyframe: true,
    output: 'css/style-purge.css',
    rejected: true,
    variables:true,
    safelist: {
      standard: [/^do-event-/],
      deep: [],
      greedy: [],
      keyframes: [],
      variables: [/^color-/]
    },
    defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
   
  }

  /// standard: [/^do-bg-/,/^video/,/^ifram/,/^slick/,/^do-auto-/,/^do-trans-/,/^html/],