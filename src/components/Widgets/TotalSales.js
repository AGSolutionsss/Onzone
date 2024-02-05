import React from 'react';
import CountUp from 'react-countup';
import TinyLineChart from 'Components/Charts/TinyLineChart';
import ChartConfig from 'Constants/chart-config';
import IntlMessages from 'Util/IntlMessages';
import { RctCard, RctCardFooter, RctCardContent } from 'Components/RctCard';

const TotalSales = ({ label, chartdata, labels, value }) => (
    <RctCard>
        <div className="rct-block-title d-flex justify-content-between">
            <div className="d-flex align-items-start">
                <h4><IntlMessages id="Total Stocks" /></h4>
            </div>
            <div className="align-items-end">
                <span className="d-block text-muted counter-point"><CountUp start={0} end={localStorage.getItem("fabricInwardStockCount")} duration={3} useEasing={true} /></span>
                <p className="text-right mb-0 text-muted">+54%</p>
            </div>
        </div>
        <RctCardContent noPadding>
            <TinyLineChart
                label={label}
                chartdata={chartdata}
                labels={labels}
                borderColor={ChartConfig.color.purple}
                pointBackgroundColor={ChartConfig.color.purple}
                height={100}
                pointBorderColor="#FFFFFF"
                borderWidth={4}
            />
        </RctCardContent>
        
    </RctCard>
);

export default TotalSales;
