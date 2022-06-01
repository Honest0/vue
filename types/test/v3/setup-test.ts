import Vue, { defineComponent } from '../../index'

// object props
Vue.extend({
  props: {
    foo: String,
    bar: Number
  },
  setup(props) {
    props.foo + 'foo'
    props.bar + 123
  }
})

// array props
Vue.extend({
  props: ['foo', 'bar'],
  setup(props) {
    props.foo
    props.bar
  }
})

// context
Vue.extend({
  setup(_props, ctx) {
    if (ctx.attrs.id) {
    }
    ctx.emit('foo')
    ctx.slots.default && ctx.slots.default()
  }
})

// object props
defineComponent({
  props: {
    foo: String,
    bar: Number
  },
  setup(props) {
    // @ts-expect-error
    props.foo.slice(1, 2)

    props.foo?.slice(1, 2)

    // @ts-expect-error
    props.bar + 123

    props.bar?.toFixed(2)
  }
})

// array props
defineComponent({
  props: ['foo', 'bar'],
  setup(props) {
    props.foo
    props.bar
  }
})

// context
defineComponent({
  emits: ['foo'],
  setup(_props, ctx) {
    if (ctx.attrs.id) {
    }
    ctx.emit('foo')
    // @ts-expect-error
    ctx.emit('ok')
    ctx.slots.default && ctx.slots.default()
  },
  methods: {
    foo() {
      this.$emit('foo')
      // @ts-expect-error
      this.$emit('bar')
    }
  }
})
