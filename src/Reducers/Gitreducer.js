const InitialData = {
  Users: [],
};

const Gitreducer = (state = InitialData, action) => {
  switch (action.type) {
    case "specusers":
      const { id, data } = action.payload;
      if (data) {
        return {
          ...state,
          Users: [
            ...state.Users,
            {
              id: id,
              data,
            },
          ],
        };
      } else {
        return false;
      }

    default:
      return state;
  }
};

export default Gitreducer;
