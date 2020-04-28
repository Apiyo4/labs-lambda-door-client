import React from 'react';
import styled from 'styled-components';
import {UserForm} from './UserForm';
import { connect } from 'react-redux';

const Div = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const Div1 = styled.div`
  width: 50%;
  margin-bottom: 1%;
`;
const H4bold = styled.h4`
  font-weight: bold;
`;
const H4margin = styled.h4`
  text-align: right;
`;
const DivBorder = styled.div`
  border: 1px solid #ccc;
  margin: auto;
  margin-top: 5%;
  margin-bottom: 5%;
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 3%;
  padding-bottom: 3%;
`;
const PersonalInfo = ({ openForm, isClose, credentials, isLoading }) => {

  return (
    <DivBorder>
      <div>
        {isClose && (
          <H4margin>
            {' '}
            <span onClick={openForm}>Edit </span>
          </H4margin>
        )}
        {!isClose && (
          <div>
            <H4margin>
              <span onClick={openForm}>Close</span>
            </H4margin>
            <div>
              <UserForm />
            </div>
          </div>
        )}
      </div>
      {isClose && (
        <Div>
          {credentials.full_name !== null ? (
            <Div1>
              <h4>Full Name:</h4>
              <H4bold>{credentials.full_name}</H4bold>
            </Div1>
          ) : (
            null
          )}

          {credentials.username !== null ? (
            <Div1>
              <h4>Username:</h4>
              <H4bold>{credentials.username}</H4bold>
            </Div1>
          ) : (
            null
          )}

          {credentials.email_address !== null ? (
            <Div1>
              <h4>Email Address:</h4>
              <H4bold>{credentials.email_address}</H4bold>
            </Div1>
          ) : (
            null
          )}

          {credentials.age !== null ? (
            <Div1>
              <h4>Age:</h4>
              <H4bold>{credentials.age}</H4bold>
            </Div1>
          ) : (
            null
          )}

          {credentials.location !== null ? (
            <Div1>
              <h4>Location:</h4>
              <H4bold>{credentials.location}</H4bold>
            </Div1>
          ) : (
            null
          )}

          {credentials.github_link !== null ? (
            <Div1>
              <h4>Github Link:</h4>
              <H4bold> {credentials.github_link} </H4bold>
            </Div1>
          ) : (
            null
          )}

          {credentials.linkedin_link !== null ? (
            <Div1>
              <h4>Linkedin Link:</h4>
              <H4bold>{credentials.github_link}</H4bold>
            </Div1>
          ) : (
            null
          )}

          {credentials.portfolio_link !== null ? (
            <Div1>
              <h4>Portfolio Link:</h4>
              <h4Bold>{credentials.portfolio_link}</h4Bold>
            </Div1>
          ) : null }
        </Div>
      )}
    </DivBorder>
  );
};

const mapStateToProps = state => ({
  credentials: state.authState.credentials,
  isLoading: state.authState.isLoading,
});

export default connect(mapStateToProps)(PersonalInfo);
