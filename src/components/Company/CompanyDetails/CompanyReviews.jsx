import React from 'react';
import styled from 'styled-components';
import { mobilePortrait, tabletPortrait } from '../../../styles/theme.styles';
import { Empty } from 'antd';
import { CompanyCards } from './CompanyCards';
import { withRouter } from 'react-router-dom';
import {  Button, Icon } from 'antd'

const StyledDiv = styled.div`
  max-width: 800px;
  padding: 40px;
  width: 90%;
  padding: 20px;
  margin: 20px;
  line-height: 1.5;

  h2 {
    font-size: 1, 5rem;
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
`;
const Div3 = styled.div`
  padding-top: 5%;
`;

const Div1 = styled.div`
  display: inline-block;
  border: 1px solid #ccc;
  border-radius:10px;
  padding-left: 20px;
  padding-top: 20px;
  padding-bottom: 30px;
  padding-right: 30px;
  margin: 0 auto;
  width: 800px;
  font-size: 18px;
  color: #000000;

  span{
    font-size: 12px;
    padding-right : 8px;
    cursor: pointer;
  }

  .company-reviews {
    margin-top: 1rem;
  }
  h2 {
    font-size: 2rem;
    color: #bb1333;
  }

  .reviews {
    p {
      font-size: 16px;
    }
  }
`;

const CompanyReviews = ({ reviews, title, companyReview,pathname, history }) => {
  const reviewInfo = reviews[0];
  const seeReviews = ()=>{
      history.push({
        pathname: pathname,
        state: { fromCompanyInfo: true },
      })
   
  }
  if (!reviews) {
    return (
      <Div3>
        <Empty
          image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
          imageStyle={{
            height: 80,
          }}
          description={
            <span className="text">
              Oops!! <br />
              No review found yet, perhaps none has been given.
            </span>
          }
        ></Empty>
      </Div3>
    );
  }
  
  return (
    <StyledDiv>
      {reviewInfo && (
        <Div1>
          {/* {if(reviews.companyReview){
            return (
              <h1>Reviews</h1>
            )
          } else if(interview)
          } */}
          <h2>{title}</h2>
          <h3>{reviewInfo.full_name} {""}</h3>
          <p className="reviews">
            {reviewInfo.text ? reviewInfo.text : reviewInfo.review}
          </p>
          <Button
          onClick={seeReviews}
        >
          {companyReview === true ? <CompanyCards /> : null}
          See More
        </Button>
        </Div1>
      )}
    </StyledDiv>
  );
};

export default withRouter(CompanyReviews);
