import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './front/Home'
import FrontLayout from './layout/FrontLayout'
import { Contact } from './front/ContactUS'
import { CorporateAssessment } from './front/CorporateAssessment'
import { SamplePapers } from './front/SamplePapers'
import { Downloads } from './front/Downloads'
import { OurAssessors } from './front/OurAssessors'
import { Faq } from './front/Faq'
import { BlacklistedAssessors } from './front/BlacklistedAssessors'
import { Gallery } from './front/Gallery'
import { OurTeam } from './front/OurTeam'
import { AboutUs } from './front/AboutUs'
import { CSR } from './front/CSR'
import { SkillAssessment } from './front/SkillAssessment'
import { ImpactAssessment } from './front/ImpactAssessment'
import { WebDevelopment } from './front/WebDevelopment'
import { ApplyAssessor } from './front/ApplyAssessor'
import { ApplyStaff } from './front/ApplyStaff'
import ContentPage from './front/contentPages/contentpage'
import { useGetPageMenuQuery } from './api/TagIndiaAPI'
import NotFound from './front/errorPage/NotFound'
import useScrollToTop from './helper/useScrollToTop'
import Services from './front/Services'

function ScrollToTop() {
  useScrollToTop();
  return null;
}
function App() {
  const { data: menuData } = useGetPageMenuQuery();
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<FrontLayout cmp={Home} />} />
          <Route path='/services/:slug?' element={<FrontLayout cmp={Services} />} />

          <Route path='/corporate-assessment' element={<FrontLayout cmp={CorporateAssessment} />} />
          <Route path='/impact-assessment' element={<FrontLayout cmp={ImpactAssessment} />} />
          <Route path='/skill-assessment' element={<FrontLayout cmp={SkillAssessment} />} />
          <Route path='/csr' element={<FrontLayout cmp={CSR} />} />
          <Route path='/web-development' element={<FrontLayout cmp={WebDevelopment} />} />

          <Route path='/our-team' element={<FrontLayout cmp={OurTeam} />} />
          <Route path='/contact' element={<FrontLayout cmp={Contact} />} />
          <Route path='/gallery' element={<FrontLayout cmp={Gallery} />} />
          <Route path='/our-assessors' element={<FrontLayout cmp={OurAssessors} />} />

          <Route path='/apply-staff' element={<FrontLayout cmp={ApplyStaff} />} />
          <Route path='/apply-assessor' element={<FrontLayout cmp={ApplyAssessor} />} />
          
          <Route path='/about-us' element={<FrontLayout cmp={AboutUs} />} />
          <Route path='/sample-papers' element={<FrontLayout cmp={SamplePapers} />} />
          <Route path='/downloads' element={<FrontLayout cmp={Downloads} />} />
          <Route path='/faq' element={<FrontLayout cmp={Faq} />} />
          <Route path='/blacklisted-assessors' element={<FrontLayout cmp={BlacklistedAssessors} />} />

          {menuData?.data?.map((item) => (
            <Route key={item.url} path={`/${item.url}`} element={<FrontLayout cmp={ContentPage} />} />
          ))}
          <Route path='/*' element={<FrontLayout cmp={NotFound} />} />

        </Routes>
      </BrowserRouter>

    </>
  )
}
export default App