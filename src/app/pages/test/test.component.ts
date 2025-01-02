import { Component } from '@angular/core';
import { ChatBubbleComponent } from "../../components/chat-bubble/chat-bubble.component";
import { ChatBubbleConfig } from '../../interfaces/ui-configs/chat-bubble-config.interface';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { UserChatCardComponent } from "../../components/user-chat-card/user-chat-card.component";
import { UserChatConfig } from '../../interfaces/ui-configs/user-chat-config.interface';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [ChatBubbleComponent, SearchInputComponent, UserChatCardComponent],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {


  leftConfig: ChatBubbleConfig = {
    text: 'Hello word how are you',
    position: 'left'
  }

  rightConfig: ChatBubbleConfig = {
    text: 'Hi man i am all good ',
    position: 'right'
  }


  userChat: UserChatConfig = {
    fullName: 'Bug Array',
    text: 'How are you',
    time: '20:00',
    profile: 'assets/user-profile.png',
    isActive: false
  }

  userChatActive: UserChatConfig = {
    fullName: 'Bug Array',
    text: 'How are you',
    time: '20:00',
    profile: 'assets/user-profile.png',
    isActive: true
  }

  handleSearch($event: string){
    console.log('Parent: ', $event);
  }
}
