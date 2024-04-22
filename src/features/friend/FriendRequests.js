import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import {
  Stack,
  Typography,
  Card,
  Box,
  Pagination,
  Grid,
  Container,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getFriendRequests,
  getOutgoingFriendRequests,
  cancelOutgoingFriendRequest,
} from "./friendSlice";

import SearchInput from "../../components/SearchInput";

function FriendRequests() {
  const [filterName, setFilterName] = useState("");
  const [page, setPage] = React.useState(1);

  const { currentPageUsers, usersById, totalUsers, totalPages } = useSelector(
    (state) => state.friend
  );
  const users = currentPageUsers.map((userId) => usersById[userId]);
  const outgoingFriendRequests = useSelector(
    (state) => state.friend.outgoingFriendRequests
  );
  const dispatch = useDispatch();

  const handleSubmit = (searchQuery) => {
    setFilterName(searchQuery);
  };

  useEffect(() => {
    dispatch(getFriendRequests({ filterName, page }));
    dispatch(getOutgoingFriendRequests({ page: 1 }));
  }, [filterName, page, dispatch]);

  const handleCancelOutgoingFriendRequest = (targetUserId) => {
    dispatch(cancelOutgoingFriendRequest(targetUserId));
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Friend Requests
      </Typography>
      <Card sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Stack direction={{ xs: "column", md: "row" }} alignItems="center">
            <SearchInput handleSubmit={handleSubmit} />

            <Box sx={{ flexGrow: 1 }} />

            {/* <Typography
              variant="subtitle"
              sx={{ color: "text.secondary", ml: 1 }}
            >
              {totalUsers > 1
                ? `${totalUsers} requests found`
                : totalUsers === 1
                ? `${totalUsers} request found`
                : "No request found"}
            </Typography> */}

            <Typography
              variant="subtitle"
              sx={{ color: "text.secondary", ml: 1 }}
            >
              {outgoingFriendRequests.length} outgoing requests
            </Typography>

            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, page) => setPage(page)}
            />
          </Stack>
        </Stack>

        <Grid container spacing={3} my={1}>
          {users.map((user) => (
            <Grid key={user._id} item xs={12} md={4}>
              <UserCard profile={user} />
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3} my={1}>
          {outgoingFriendRequests.map((userId) => (
            <Grid key={userId} item xs={12} md={4}>
              <UserCard
                profile={usersById[userId]}
                showCancelButton
                onCancel={() => handleCancelOutgoingFriendRequest(userId)}
              />
            </Grid>
          ))}
        </Grid>
      </Card>
    </Container>
  );
}

export default FriendRequests;
