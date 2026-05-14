import React from 'react'
import { useParams } from 'react-router-dom';
import { useGetServicesContentQuery } from '../api/TagIndiaAPI';
import { CorporateAssessment } from './CorporateAssessment';
import { ImpactAssessment } from './ImpactAssessment';

const Services = () => {
    const { slug } = useParams()
    const { data, isLoading, isError } = useGetServicesContentQuery(slug);
    const serviceData = data?.data;
    const leyout = serviceData?.service?.layout
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-10 h-10 border-4 border-[#6A1B9A] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (isError || !serviceData) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <p className="text-gray-500 text-lg">Page not found.</p>
            </div>
        );
    }

    console.log("serviceData", serviceData)

    return (
        <>
            {
                leyout === "layout1" ?
                    <CorporateAssessment data={serviceData?.form_data} />
                    :
                    leyout === "layout2" ?
                        <ImpactAssessment data={serviceData?.form_data} />
                        :
                        <></>
            }
        </>
    )
}

export default Services