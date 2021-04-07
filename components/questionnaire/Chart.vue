<script>
import { HorizontalBar } from 'vue-chartjs';

export default {
    props: {
        chart_data: Object
    },
    extends: HorizontalBar,
    name: 'AudienceResult',
    data () {
        return {
            data: {
                labels: this.chart_data.text,
                datasets: [
                    {   
                        label: "sample",
                        data: this.chart_data.votes_count,
                        backgroundColor: "#fcba03a0"
                    }
                ]
            },
            options: {
                responsive: true,

                legend: {
                    display: false
                },

                scales: {
                    xAxes: [{
                        ticks: {
                            min: 0,
                            stepSize: 10,
                            fontSize: 14
                        },
                        gridLines: {
                            display: true
                        },
                    }],
                    yAxes: [{
                        ticks: {
                            fontSize: 14
                        },
                        gridLines: {
                            display: false
                        },

                    }]
                }
            }
        }
    },
    mounted () {
        // console.log(this.chart_data);
        this.renderChart(this.data, this.options);
    }
}

</script>