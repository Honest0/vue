({
  type: 'recycle-list',
  attr: {
    listData: [
      { type: 'A', dynamic: 'decimal', two: '2', four: '4' },
      { type: 'A', dynamic: 'binary', two: '10', four: '100' }
    ],
    templateKey: 'type',
    alias: 'item'
  },
  children: [{
    type: 'cell-slot',
    attr: { templateType: 'A' },
    children: [{
      type: 'text',
      attr: {
        value: 'static'
      }
    }, {
      type: 'text',
      attr: {
        value: { '@binding': 'item.dynamic' }
      }
    }, {
      type: 'text',
      attr: {
        value: [
          'one ',
          { '@binding': 'item.two' },
          ' three ',
          { '@binding': 'item.four' },
          ' five'
        ]
      }
    }]
  }]
})
