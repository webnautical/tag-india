import React from 'react'

const HTMLContent = ({ data }) => {
    return (
        <>
            <div
                className="text-gray-600 leading-relaxed prose-ul-custom"
                dangerouslySetInnerHTML={{ __html: data }}
            />
        </>
    )
}

export default HTMLContent