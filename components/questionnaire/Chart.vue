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
                        },
                        gridLines: {
                            display: true
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            display: false
                        }
                    }]
                }
                // scales: {
                //     y: {
                //         min: 0,
                //         max: 50,
                //         ticks: {
                //             stepSize: 10
                //         }
                //     },
                // }
            }
        }
    },
    mounted () {
        console.log(this.chart_data);
        this.renderChart(this.data, this.options);
    }
}

</script>