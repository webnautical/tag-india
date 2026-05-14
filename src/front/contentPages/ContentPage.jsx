import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useGetContentPageQuery } from "../../api/TagIndiaAPI";
import { IMG_BASE_URL } from "../../helper/utils";
const ContentPage = () => {
  const location = useLocation();
  const slug = location.pathname.replace(/^\//, "");
  const { data, isLoading, isError } = useGetContentPageQuery(slug);
  const page = data?.data;

  useEffect(() => {
    if (!page) return;

    document.title = page.meta_title || "Tag India";

    const updateMetaTag = (name, content) => {
      let meta = document.querySelector(`meta[name="${name}"]`);

      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", name);
        document.head.appendChild(meta);
      }

      meta.setAttribute("content", content || "");
    };

    updateMetaTag("description", page.meta_description);
    updateMetaTag("keywords", page.meta_keywords);

  }, [page]);

  console.log('data', data)
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 border-4 border-[#6A1B9A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isError || !page) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500 text-lg">Page not found.</p>
      </div>
    );
  }

  const sections = [
    { title: page.title1, desc: page.desc1, image: page.image1 },
    { title: page.title2, desc: page.desc2, image: page.image2 },
    { title: page.title3, desc: page.desc3, image: page.image3 },
  ].filter((s) => s.title || s.desc || s.image);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-black capitalize">
        {slug.replace(/-/g, " ")}
      </h1>

      {sections.map((section, i) => {
        const hasTitle = !!section.title;
        const hasDesc = !!section.desc;
        const hasImage = !!section.image;
        const isEven = i % 2 === 0;

        // Text only
        if (!hasImage) {
          return (
            <div key={i} className=" w-full">
              {hasDesc && (
                <div
                  className="text-gray-600 leading-relaxed prose-ul-custom"
                  dangerouslySetInnerHTML={{ __html: section.desc }}
                />
              )}
            </div>
          );
        }

        // Image only
        if (!hasTitle && !hasDesc) {
          return (
            <div key={i}>
              <img
                src={`${IMG_BASE_URL()}page/${section.image}`}
                alt=""
                className="w-full max-h-[420px] object-cover rounded-xl"
              />
            </div>
          );
        }

        // Text + Image — alternating layout
        return (
          <div
            key={i}
            className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${!isEven ? "lg:flex-row-reverse" : ""
              }`}
          >
            {/* Image */}
            <div className="w-full lg:w-[45%] flex-shrink-0">
              <img
                src={`${IMG_BASE_URL()}page/${section.image}`}
                alt={section.title || ""}
                className="w-full h-[300px] object-cover rounded-xl shadow-md"
              />
            </div>

            {/* Text */}
            <div className="w-full lg:w-[55%] space-y-4">
              {hasTitle && (
                <h2 className="text-2xl sm:text-3xl lg:text-[2rem] font-bold text-black">
                  {section.title}
                </h2>
              )}
              {hasDesc && (
                <div
                  className="text-gray-600 leading-relaxed prose-ul-custom"
                  dangerouslySetInnerHTML={{ __html: section.desc }}
                />
              )}
            </div>
          </div>
        );
      })}

      {/* Global style for HTML content from API */}
      <style>{`
        .prose-ul-custom ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }
        .prose-ul-custom ul li { padding-left: 20px; position: relative; color: #4B5563; }
        .prose-ul-custom ul li::before { content: '→'; position: absolute; left: 0; color: #6A1B9A; font-weight: 700; }
        .prose-ul-custom h3 { font-size: 1rem; font-weight: 400; color: #4B5563; line-height: 1.8; margin: 0; }
      `}</style>
    </div>
  );
};

export default ContentPage;