import { bootstrapApplication } from '@angular/platform-browser';
import { ChatComponent } from './app/chat/chat.component';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(ChatComponent, {
  providers: [provideHttpClient()]
}).catch(err => console.error(err));