import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  yourFeedbacks: any;
  yourFeedbackMessage: any;
  feedback_data: any;

  public yourFeedbacksData: Array<any> = [];
  public feedbackUsersList: Array<any> = [];

  constructor(private auth: AuthenticationService, private toastr: ToastrService) { }

  ngOnInit() {
    console.log(this.yourFeedbacksData.length);
    this.auth.getFeedback().subscribe(
      (response) => {
        if (response.data === null) {
          this.yourFeedbackMessage = response.message;
          this.yourFeedbacks = response.data;
          this.yourFeedbacksData = response.data;
        } else {
          this.toastr.info('Your Feedbacks!', response.message);
          this.yourFeedbacksData = response.data;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public getIds() {
    this.auth.fetchIds().subscribe(
      (response) => {
        if (response.data === null) {
          this.toastr.info('Nothing to post', response.message);
          this.feedbackUsersList = response.data;
        } else {
          this.feedbackUsersList = response.data;
          console.log(this.feedbackUsersList);
          this.feedbackUsersList['model'] = response.data._id;
          this.feedbackUsersList['isDisabled'] = false;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public submitReview(item, index) {
    this.auth.giveYourReview(item.receiver_id, item.model).subscribe(
      (response) => {
        console.log(response);
        this.feedbackUsersList.splice(index, 1);
        this.toastr.info('', `Feedback given to: ${response.receiver_name}`);
      },
      (err) => {
        console.log(err);
        this.toastr.warning(err.error.message);
      }
    );
  }
}
