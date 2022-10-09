import { Component } from '@angular/core';
import { Config, ConfigService } from './config.servic';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css'],
  providers: [ConfigService],
})
export class ConfigComponent {
  error: any;
  headers: string[] = [];
  config: Config | undefined;

  constructor(private configService: ConfigService) {}

  showConfig() {
    this.configService.getConfig().subscribe(
      (data: Config) =>
        (this.config = {
          userseUrl: data.userseUrl,
        })
    );
  }
}
