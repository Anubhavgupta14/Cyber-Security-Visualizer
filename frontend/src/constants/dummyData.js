export const dummyData = [
    {
      _id: "6777b67540befe0988ff8bf7",
      timestamp: "2024-02-02T16:55:03.132Z",
      idx: "msg_002",
      query: "Analyze potential",
      agents: [
        {
          name: "Security Scanner22",
          tools: [
            {
              name: "SQL Analyzer22",
              input: "SELECT * FROM users WHERE username='${input}'",
              output: "Potential SQL injection detected - Input not properly sanitized",
              idx: "tool_001",
              _id: "6777d16c8241c4ca1a155f0b"
            }
          ],
          images: [],
          output: "High severity vulnerability detected in login system",
          idx: "agent_001",
          _id: "6777d16c8241c4ca1a155f0a"
        }
      ],
      response: "Security audit complete. Critical SQL injection vulnerability detected.",
      total_tokens: 1909,
      is_active: true
    }
  ];