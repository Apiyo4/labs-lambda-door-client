/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { Skeleton, Card } from 'antd';
import { withRouter, useParams, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ContactReviewer from '../../ContactReviewerModal';
import { getSalaryReviewsByCompanyId } from '../../../state/actions/reviews';
import currencies from '../../../utils/currencies';
import ChatButton from '../../Layout/Chat/ChatButton';
import UserDetails from '../InterviewReviews/UserDetails';
import BackButton from '../CompanyDetails/BackButton';

let salaryFormatted;

const SalaryReviewDetails = ({
  history,
  singleCompanyReviews: {
    reviews: { salaryReview },
  },
  getSalaryReviewsByCompanyId,
}) => {
  const { id, companyId } = useParams();
  const review = salaryReview.find(elem => elem.id === Number(id));
  if (review) {
    const currencyUnit = currencies.find(curr => curr.name === review.currency)
      .symbol;
    salaryFormatted = `${currencyUnit}${Number(review.salary)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
  }
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!review) {
      getSalaryReviewsByCompanyId(companyId);
    }
  }, []);

  return !salaryReview.length ? (
    <Skeleton />
  ) : (
    <div>
      <ContactReviewer
        loading={loading}
        setLoading={setLoading}
        open={open}
        setOpen={setOpen}
        email={review.email_address}
      />
      <BackButton />
      <StyledCard>
        <div className="title-div">
          <h1>{review.name}</h1>
        </div>

        <div className="salary-div">
          <h2>Salary</h2>
          <h3>
            {salaryFormatted}
            /yr
          </h3>
        </div>

        <div className="interest">
          <h2>Job Category</h2>
          <h3>{review.interest}</h3>
        </div>

        <div className="description">
          <h2>Job Description</h2>
          <span>{review.description}</span>
        </div>

        <div className="bottom">
          <div className="contact">
            {review.is_accepting_questions && !review.is_anonymous ? (
              <>
                <p>
                  Have questions? &nbsp;&nbsp;
                  <ChatButton
                    toUserID={review.user_id}
                    toUserName={<Link to="/">review.full_name</Link>}
                  />
                </p>
              </>
            ) : (
              ''
            )}
          </div>
          {review.is_anonymous ? (
            <div>Anonymous User</div>
          ) : (
                <UserDetails review={review} />
          )}
        </div>
      </StyledCard>
    </div>
  );
};

const StyledCard = styled(Card)`
  @media (min-width: 1024px) {
    width: 60%;

    .interest {
      margin-top: 20px;
    }

    .description {
      margin-top: 20px;
    }
  }
  .username {
    padding-top: 2rem;
    text-align: right;
    justify-content: flex-end;
  }

  .bottom {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    padding-top: 2rem;
  }
`;

export default withRouter(
  connect(state => state, { getSalaryReviewsByCompanyId })(SalaryReviewDetails)
);
