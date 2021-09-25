// The raw data to observe
const stats = [
  { label: 'A', value: 100 },
  { label: 'B', value: 100 },
  { label: 'C', value: 100 },
  { label: 'D', value: 100 },
  { label: 'E', value: 100 },
  { label: 'F', value: 100 }
]

// A reusable polygon graph component
Vue.component('polygraph', {
  props: ['stats'],
  template: '#polygraph-template',
  computed: {
    // a computed property for the polygon's points
    points: function () {
      const total = this.stats.length
      return this.stats.map(function (stat, i) {
        const point = valueToPoint(stat.value, i, total)
        return point.x + ',' + point.y
      }).join(' ')
    }
  },
  components: {
    // a sub component for the labels
    'axis-label': {
      props: {
        stat: Object,
        index: Number,
        total: Number
      },
      template: '#axis-label-template',
      computed: {
        point: function () {
          return valueToPoint(
            +this.stat.value + 10,
            this.index,
            this.total
          )
        }
      }
    }
  }
})

// math helper...
function valueToPoint (value, index, total) {
  const x     = 0
  const y     = -value * 0.8
  const angle = Math.PI * 2 / total * index
  const cos   = Math.cos(angle)
  const sin   = Math.sin(angle)
  const tx    = x * cos - y * sin + 100
  const ty    = x * sin + y * cos + 100
  return {
    x: tx,
    y: ty
  }
}

// bootstrap the demo
new Vue({
  el: '#demo',
  data: {
    newLabel: '',
    stats: stats
  },
  methods: {
    add: function (e) {
      e.preventDefault()
      if (!this.newLabel) return
      this.stats.push({
        label: this.newLabel,
        value: 100
      })
      this.newLabel = ''
    },
    remove: function (stat) {
      if (this.stats.length > 3) {
        this.stats.splice(this.stats.indexOf(stat), 1)
      } else {
        alert('Can\'t delete more!')
      }
    }
  }
})
