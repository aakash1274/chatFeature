import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserChatCardComponent } from './user-chat-card.component';

describe('UserChatCardComponent', () => {
  let component: UserChatCardComponent;
  let fixture: ComponentFixture<UserChatCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserChatCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserChatCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
