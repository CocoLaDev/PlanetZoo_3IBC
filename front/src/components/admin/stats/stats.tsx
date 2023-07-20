import { useEffect, useState } from "react";
import { Chart, initTE } from "tw-elements";
import { Spaces } from "../../../services";
import { Space } from "../../../dto";
const Stats = () => {

    const [spaces, setSpaces] = useState<Space[]>([]);

    useEffect(() => {
        async function fetchSpaces() {
            const response = await Spaces.getAllSpaces();
            if (response) {
                console.log(response);
                setSpaces(response);
            }
        }
        fetchSpaces();
    }, []);

    useEffect(() => {
        if (spaces.length > 0)
            initChart();
    }, [spaces]);

    function initChart() {
        initTE({ Chart });
        const dataDoughnut = {
            type: 'doughnut',
            data: {
                labels: spaces.map(space => space.name),
                datasets: [
                    {
                        label: 'Traffic',
                        data: spaces.map(space => space.currentVisitors ? space.currentVisitors : 0),
                        backgroundColor: [
                            'rgba(63, 81, 181, 0.5)',
                            'rgba(77, 182, 172, 0.5)',
                            'rgba(66, 133, 244, 0.5)',
                            'rgba(156, 39, 176, 0.5)',
                            'rgba(233, 30, 99, 0.5)',
                            'rgba(66, 73, 244, 0.4)',
                            'rgba(66, 133, 244, 0.2)',
                        ],
                    },
                ],
            },
        };
        new Chart(document.getElementById('doughnut-chart'), dataDoughnut);
    }

    return (
        <div className="w-full m-16 h-[71vh] bg-white rounded-xl p-8">
            <h1>Stats</h1>
            <div className="mx-auto w-3/5 overflow-hidden">
                <div id="doughnut-chart" className="w-1/2"></div>
            </div>
        </div>
    );
}

export default Stats;