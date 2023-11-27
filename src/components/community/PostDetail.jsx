import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Avatar,
  TextField,
  Divider,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import SaveButton from '../common/SaveButton';
import PersonIcon from '@mui/icons-material/Person';
import SendIcon from '@mui/icons-material/Send';


const PostDetail = () => {
  const { postId } = useParams();

  const [post, setPost] = useState({
    id: postId,
    username: 'Saul',
    title: '게시물 제목',
    content: '게시물 내용이 여기에 들어갑니다. 실제 데이터는 서버에서 가져와야 합니다.',
  });

  const [editedTitle, setEditedTitle] = useState(post.title);
  const [editedContent, setEditedContent] = useState(post.content);
  const [commentContent, setCommentContent] = useState(''); // 댓글 작성용 상태 추가

  const [comments, setComments] = useState([]);

  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setEditedContent(e.target.value);
  };

  const handleCommentContentChange = (e) => {
    setCommentContent(e.target.value);
  };

  const handleCommentSubmit = () => {
    const newComment = {
      username: 'Saul',
      text: commentContent,
    };
    setComments([...comments, newComment]);
    setCommentContent(''); // 댓글 입력 후 입력 칸 비우기
  };

  return (
    <Container maxWidth="md" sx={{ mt: 10 }}>
      <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ width: 80, height: 80, mb: 2 }}>U</Avatar>
        <Typography variant="h6" gutterBottom>
          {post.username}
        </Typography>

        {/* 게시물 제목 수정 입력 */}
        <TextField
          label="게시물 제목"
          value={editedTitle}
          onChange={handleTitleChange}
          sx={{ width: '100%', mb: 2 }}
        />

        {/* 게시물 내용 수정 입력 */}
        <TextField
          label="게시물 내용"
          value={editedContent}
          onChange={handleContentChange}
          sx={{ width: '100%', mb: 2 }}
          multiline
          rows={4}
        />

        {/* SaveButton 또는 다른 버튼 */}
        <div style={{ display: 'flex' }}>
          <SaveButton />
          <Button variant="outlined" href="#outlined-buttons">투표 생성</Button>
        </div>

        {/* 구분선 */}
        <Divider sx={{ my: 2, width: '100%' }} />

        {/* 댓글 입력 칸 */}
        <div style={{ display: 'flex', mb: 1, width : '100%' }}>
          <TextField

            label="댓글 작성"
            value={commentContent}
            onChange={handleCommentContentChange}
            sx={{ mr: 1, width : '90%' }}
            rows={1}
          />
          <IconButton onClick={handleCommentSubmit} color="primary">
            <SendIcon />
          </IconButton>
        </div>

        {/* 댓글 목록 */}
        <List sx={{ width: '100%', mb: 2 }}>
          {comments.map((comment, index) => (
            <ListItem key={index} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={comment.username}
                secondary={comment.text}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default PostDetail;