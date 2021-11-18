import { useEffect, useState } from "react";
import { useContext } from "../../../hook/context";

export const MoneyRequestsList = () => {
  const {
    contract,
    user: { address: from },
  } = useContext();
  const [requests, setRequests] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getRequests = async () => {
    try {
      const moneyRequesters = await contract.methods
        .getMoneyRequests()
        .call({ from });

      moneyRequesters.map(async (requester) => {
        const request = await contract.methods
          .getMoneyRequest(requester)
          .call({ from });

        setRequests([...requests, { requester, request }]);
      });
    } catch (e) {
      console.log(e);
      alert(e);
    }
    console.log(requests);
  };

  const handleRequestOperation = async (request, accept) => {
    try {
      await contract.methods
        .approveMoneyRequest(request.requester, accept)
        .send({ from, value: request.request.count });
      await getRequests();
      alert(
        `Successfully ${accept ? "accepted" : "denied"} request of ${
          request.requester
        }, transfered ${request.request.count} ether`
      );
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getRequests(), []);

  return (
    <div className="money_requests_list">
      <ol>
        {requests.map(
          (request, i) =>
            request.requester && (
              <>
                <li key={i}>
                  <h4>{request.requester}</h4>
                  <h5>
                    Wanted sum of money: <b>{request.request.count}</b>
                  </h5>
                  <button onClick={() => handleRequestOperation(request, true)}>
                    Accept
                  </button>
                  <button
                    onClick={() => handleRequestOperation(request, false)}
                  >
                    Deny
                  </button>
                </li>
                <br />
              </>
            )
        )}
      </ol>
    </div>
  );
};
