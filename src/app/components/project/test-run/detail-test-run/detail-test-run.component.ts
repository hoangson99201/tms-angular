import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Result } from 'src/app/models/result';
import { ResultService } from 'src/app/services/result.service';
import { AddResultComponent } from '../add-result/add-result.component';
import { StatusDropdownComponent } from './status-dropdown/status-dropdown.component';

@Component({
  selector: 'app-detail-test-run',
  templateUrl: './detail-test-run.component.html',
  styleUrls: ['./detail-test-run.component.scss'],
})
export class DetailTestRunComponent implements OnInit {
  public projectId: string = '';
  public testRunId: string = '';
  public results: Result[] = [];
  public map: Map<string, Result[]> = new Map<string, Result[]>();
  public top: string = '';
  public left: string = '';
  @ViewChild('statusDropdown') statusDropdown: any;
  @ViewChild('button') button: any;
  public isMenuOpen = false;
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private resultService: ResultService,
    private renderer: Renderer2
  ) {
    // this.renderer.listen('window', 'click', (e: Event) => {
    //   console.log(this.statusDropdown);
    //   console.log(this.button);
    //   if (
    //     e.target !== this.statusDropdown.nativeElement &&
    //     e.target !== this.button.nativeElement
    //   ) {
    //     console.log('if');
    //     console.log(e.target);
    //     this.top = ''
    //     this.left = ''
    //   } else {
    //     console.log('else');
    //     console.log(e.target);
    //   }
    // }
    // );
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params);
      this.projectId = params['id'];
      this.testRunId = params['subId'];
      console.log(this.projectId);
      console.log(this.testRunId);
      this.refreshResult(parseInt(this.testRunId));
    });
  }

  refreshResult(testRunId: number) {
    this.resultService.findAllByTestRunId(testRunId).subscribe(results => {
      this.results = results;
      for (const result of results) {
        if (!result.sectionName) continue;
        let results = this.map.get(result.sectionName);
        if (!results) {
          this.map.set(result.sectionName, [result]);
        } else {
          results.push(result);
        }
      }
    })
  }

  openDialog() {
    console.log('here');

    const dialogRef = this.dialog.open(AddResultComponent, {
      data: {
        type: 'add',
      },
    });
  }

  openDropDown(e: any) {
    var target = e.target || e.srcElement || e.currentTarget;
    console.log(target.getBoundingClientRect());
    this.left = target.getBoundingClientRect()['x'] + 'px';
    this.top = target.getBoundingClientRect()['y'] + 24 + 'px';
    console.log(this.isMenuOpen);
    console.log(this.top);
    console.log(this.left);
  }
}
