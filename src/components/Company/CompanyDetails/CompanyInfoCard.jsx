import React from 'react';
import styled from 'styled-components';
import { mobilePortrait, tabletPortrait } from '../../../styles/theme.styles';
import CompanyReviews from './CompanyReviews';
import CompanyProfile from '../CompanyReview/CompanyProfile';
import { connect } from 'react-redux';
import { getCompanies } from '../../../state/actions/companies';
import { useEffect } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { getAvgSalaries } from '../../../state/actions/avgSalaries';
import { Spin } from 'antd';
import {
  getReviewsByCompanyId,
  getInterviewReviews,
} from '../../../state/actions/reviews';
import { CompanyCards } from './CompanyCards';

const StyledDiv = styled.div`
  width: 95%;

  h2 {
    font-size: 2rem;
    
  }
  @media ${mobilePortrait} {
    padding: 0 !important;
  }

  @media ${tabletPortrait} {
    padding: 0 !important;
    width: 98%;
  }
  @media ${mobilePortrait} {
    flex-direction: column;
  }
  .textInfo {
    display: inline-block;
    margin-right: 20px;
    margin-left: 45px;
  }
  .location {
    display: inline-block;
  }
`;
const Pcursor = styled.p`
  cursor: pointer;
  margin-left: 40px;
`;
const H3 = styled.a`
  cursor: pointer;
`;
const Container = styled.div`
max-width:1000px;
`;
export const CompanyInfoCard = ({
  history,
  companies,
  singleCompanyReviews,
  avgSalaries,
  getCompanies,
  getAvgSalaries,
  getReviewsByCompanyId,
  getInterviewReviews,
  singleCompanyReviews: { reviews },
}) => {
  const companiesArr = companies.companies;
  const companyId = useParams().id;
  useEffect(() => {
    getCompanies();
    getAvgSalaries(companyId);
    getReviewsByCompanyId(companyId);
  }, [companyId]);

  const companyReview = reviews.companyReview;
  const interviewReview = reviews.interviewReview;

  if (!companies && !avgSalaries && !reviews) {
    return (
      <h1>
        <Spin />
      </h1>
    );
  }
  const company = companiesArr.find(
    element => parseInt(companyId) === element.id
  );

  return (
    <Container>
    <StyledDiv>
      {company && avgSalaries && reviews ? (
        <div>
          <div className="textInfo">
            <h2>{company.name}- </h2>
          </div>
          <div className="location">
            <h2>{company.location}</h2>
          </div>
          <CompanyProfile
            company={company}
            avgSalaries={avgSalaries.avgSalaries[0]}
          />
        </div>
      ) : null}

      <div>
        {/* <h2>Review</h2> */}
        {companyReview && companyId &&  (
          <CompanyReviews
            reviews={companyReview}
            pathname={ `/company-page/${companyId}/review`}
            companyReview={companyReview}
            interviewReview={interviewReview}
            id={companyId}
            title={'Reviews'}
          />
        )}
        {/* <h2>Interview Process</h2> */}
        {interviewReview && (
          <CompanyReviews
            reviews={interviewReview}
            title={'Interview Process'}
            pathname={ `/company-page/${companyId}/interview`}
          />
        )}
      </div>
    </StyledDiv>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    companies: state.companies,
    avgSalaries: state.avgSalaries,
    singleCompanyReviews: state.singleCompanyReviews,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    getCompanies,
    getAvgSalaries,
    getReviewsByCompanyId,
    getInterviewReviews,
  })(CompanyInfoCard)
);
