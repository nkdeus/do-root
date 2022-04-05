// define extractor class


module.exports = {
    content: ['dist/**/*.html'],
    css: ['src/css/styles.css'],
    keyframe: true,
    output: 'dist/css/styles.css',
    rejected: true,
    variables:true,
    safelist: {
      standard: [/^do-event-/,/^get-progress-/],
      deep: [],
      greedy: [],
      keyframes: [],
      variables: [/^color-/]
    },
    defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
   
  }

  /// standard: [/^do-bg-/,/^video/,/^ifram/,/^slick/,/^do-auto-/,/^do-trans-/,/^html/],