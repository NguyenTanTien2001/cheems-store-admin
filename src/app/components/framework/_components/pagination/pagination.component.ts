import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';

// Reference: https://angular.io/api/common/NgTemplateOutlet
// Reference: https://indepth.dev/posts/1405/ngtemplateoutlet
// Reference: https://www.digitalocean.com/community/tutorials/angular-reusable-components-ngtemplateoutlet
// Reference: https://blog.angular-university.io/angular-ng-template-ng-container-ngtemplateoutlet/

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input()
  headerTemplate!: TemplateRef<any>;

  @Input()
  paginationIdx!: string;

  public MAX_SIZE: number = 5;

  @Output() appOnPageChange = new EventEmitter<string>();


  constructor() { }

  ngOnInit(): void {
  }

  cOnPageChange($event: any) {

    this.appOnPageChange.emit($event);
  }

}
