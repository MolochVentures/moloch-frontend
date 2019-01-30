import { combineReducers } from 'redux';
import MembersReducers from './MembersReducers'
import MemberDetailReducers from './MemberDetailReducers';
import ProposalsReducers from './ProposalsReducers'
import ProposalDetailReducers from './ProposalDetailReducers'
import EventsReducers from './EventsReducers'

export default combineReducers({
    members: MembersReducers,
    memberDetail: MemberDetailReducers,
    proposals: ProposalsReducers,
    proposalDetail: ProposalDetailReducers,
    events: EventsReducers
});