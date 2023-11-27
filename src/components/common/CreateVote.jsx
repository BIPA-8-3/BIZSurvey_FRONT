import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const CreateVote = () => {
  const [voteTitle, setVoteTitle] = useState('');
  const [voteOptions, setVoteOptions] = useState(['']);

  const handleTitleChange = (e) => {
    setVoteTitle(e.target.value);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...voteOptions];
    newOptions[index] = value;
    setVoteOptions(newOptions);
  };

  const handleAddOption = () => {
    setVoteOptions([...voteOptions, '']);
  };

  const handleRemoveOption = (index) => {
    const newOptions = [...voteOptions];
    newOptions.splice(index, 1);
    setVoteOptions(newOptions);
  };

  const handleVoteSubmit = () => {
    // 여기에서 투표를 서버에 제출하는 로직을 추가할 수 있습니다.
    console.log('투표 제목:', voteTitle);
    console.log('투표 항목:', voteOptions);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 10 }}>
      <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" gutterBottom>
          투표 생성
        </Typography>

        {/* 투표 제목 입력 */}
        <TextField
          label="투표 제목"
          value={voteTitle}
          onChange={handleTitleChange}
          sx={{ width: '100%', mb: 2 }}
        />

        {/* 투표 항목 목록 */}
        <List sx={{ width: '100%', mb: 2 }}>
          {voteOptions.map((option, index) => (
            <ListItem key={index} sx={{ display: 'flex' }}>
              <ListItemText>
                <TextField
                  label={`투표 항목 ${index + 1}`}
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  sx={{ width: '100%' }}
                />
              </ListItemText>
              <IconButton onClick={() => handleRemoveOption(index)} color="error">
                <RemoveIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>

        {/* 투표 항목 추가 버튼 */}
        <IconButton onClick={handleAddOption} color="primary">
          <AddIcon />
        </IconButton>

        {/* 투표 제출 버튼 */}
        <IconButton onClick={handleVoteSubmit} color="primary">
          투표 생성
        </IconButton>

        {/* 구분선 */}
        <Divider sx={{ my: 2, width: '100%' }} />
      </Paper>
    </Container>
  );
};

export default CreateVote;