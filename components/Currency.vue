<template>
<tr>
  <td>{{ ticker }}</td>
  <td>{{ name }}</td>
  <td>{{ high24 }}</td>
  <td>{{ low24 }}</td>
  <td>{{ current }}</td>
  <td>{{ percentChange }}</td>
  <td>{{ EMA1 }}</td>
  <td>{{ EMA2 }}</td>
  <td>{{ EMADelta }}</td>
</tr>
</template>

<script>
export default {
  props: ['ticker', 'name', 'high24', 'low24', 'current', 'percentChange', 'EMA1', 'EMA2'],
  computed: {
    EMADelta: function () {
      return this.EMA1 - this.EMA2
    }
  }
}
</script>
