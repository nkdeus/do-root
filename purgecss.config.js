// define extractor class


module.exports = {
    content: ['render/*.html'],
    css: ['sources/css/styles.css'],
    keyframe: true,
    output: 'render/css/styles.css',
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