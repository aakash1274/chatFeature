import { Component, OnInit } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CommonModule } from '@angular/common';
import { UserChatConfig } from '../../interfaces/ui-configs/user-chat-config.interface';
import { UserChatCardComponent } from '../../components/user-chat-card/user-chat-card.component';
import { AuthService } from '../../services/auth.service';
import { ChatService } from '../../services/chat.service';
import { ChatBubbleComponent } from '../../components/chat-bubble/chat-bubble.component';
import { ChatBubbleConfig } from '../../interfaces/ui-configs/chat-bubble-config.interface';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChatRoom, Message } from '../../interfaces/models/chat-room.interface';

@Component({
  selector: 'app-chats',
  standalone: true,
  imports: [SearchInputComponent, CommonModule, UserChatCardComponent ,ChatBubbleComponent, ReactiveFormsModule],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.scss'
})
export class ChatsComponent implements OnInit {

  userChats: UserChatConfig[] = []; 
  currentUser: any;
  senderUser: any;
  chats: ChatBubbleConfig[] = [];
  messageControl: FormControl = new FormControl('', [Validators.required]);
  chatRoomData!: ChatRoom;
  constructor(public authService: AuthService, private chatService: ChatService) {}

  ngOnInit(): void {
      this.authService.getUserById().then((res) => {
        this.currentUser = res;
      }).catch((error) =>{
        console.error(error);
      });

      this.getAllChats();
      this.getUsers();

  }


  getUsers() {
    
    this.chatService.userSubject.subscribe((res) => {
      this.userChats = res.map((item, index) =>{
        const user: UserChatConfig = {
          fullName: item.fullName,
          text: '',
          time: '20:00',
          profile: item.profile,
          isActive: false,
          onClick: () => {
            const chatUserId = item.userId;
            this.senderUser = user;
            this.senderUser.userId = chatUserId;
            this.userChats.map((uu) => uu.isActive = false);
            user.isActive = true;
            console.log(this.senderUser)
            this.chatService.getChatRoom(this.senderUser);
            
          }
        }
        this.getLastTextMessage(item, user);
        return user
      })
    });
    this.chatService.getAllUsers();

    // adding the commit
  } 


  getAllChats() {
    this.chatService.chatRoomSubject.subscribe((res) => {
      this.chatRoomData = res;
       this.chats = res.messages.map((item) => {
        return {
          text: item.messageText,
          position: item.senderId === this.authService.getCurrentUser().uid ? 'right': 'left'
        } as ChatBubbleConfig
       })
    }) 
  }


  addMessage() {
    if(!this.messageControl.value.trim()) {
      return;
    }


    const message: Message = {
      senderId: this.authService.getCurrentUser().uid ?? '',
      messageText: this.messageControl.value,
      timestamp: new Date(),
      read: false,
      messageType: 'text',
      fullName: this.currentUser.fullName
    }
    this.chatService.addMessage(this.chatRoomData.chatRoomId ?? '', message);
    this.messageControl.reset();
  }

  getLastTextMessage(item: any, user: UserChatConfig) {
    let lastText = '';
    this.chatService.getLastText(item).subscribe((res: any) => {
      if(res){
        lastText = res?.lastText ?? '';
        user.text = lastText

      } 
    })
  }

  handleSearch($event: string){
    console.log('Parent: ', $event);
  }
}
