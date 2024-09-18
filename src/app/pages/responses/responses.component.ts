import { FormService } from '@/shared/services/form.service';
import { DatePipe } from '@angular/common';
import { AfterContentInit , Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as saveAs from 'file-saver';
import { Chart } from 'chart.js/auto';

interface Filter {
  label: string;
  value: string;
}

@Component({
  selector: 'app-responses',
  templateUrl: './responses.component.html',
  styleUrls: ['./responses.component.css'],
  providers: [DatePipe]
})
export class ResponsesComponent implements OnInit ,AfterContentInit {
  formid: string | null = null;
  submissions: any[] = [];
  data: any[] = [];
  filteredData: any[] = [];
  questionLabels: string[] = [];
  dropdownData: string[] = [];  
  filters: Filter[] = [{ label: '', value: '' }]; 
  selectedTab: string = 'Table';
  charts: Chart[] = [];

  constructor(
    private formService: FormService,
    private route: ActivatedRoute,
    protected datePipe: DatePipe,
 
  ) { }
  
  async ngOnInit(): Promise<void> {
    if (this.route) {
      this.formid = this.route.snapshot.paramMap.get('id');
      if (this.formid) {
        this.submissions = await this.formService.getAllSubmission(this.formid);
        const rawData = await this.formService.getSubmissionDetails(this.formid);
        this.data = this.transformDataToArray(rawData);
        this.filteredData = this.data;
        this.extractQuestionLabels();
        this.populateDropdownData(); 
      }
    }
  }
 
  
  ngAfterContentInit(): void {
    // this.generateStatisticsCharts();
  }

  onTabClick(tab: string): void {
    this.selectedTab = tab;
    if (this.selectedTab === 'Statistics') {
     
      this.generateStatisticsCharts();
    }
  }

  generateStatisticsCharts(): void {
    console.log('Generating charts for questions:', this.questionLabels);

    setTimeout(() => {
      this.questionLabels.forEach((label, index) => {
        const answers = this.collectAnswersForQuestion(label);
        const answerCounts = this.countAnswers(answers);

        console.log(`Chart ${index} for question "${label}" - Answers:`, answerCounts);

        const canvasElement = document.getElementById(`chart-${index}`) as HTMLCanvasElement;
        if (!canvasElement) {
          console.error(`Canvas element with ID "chart-${index}" not found.`);
          return;
        }

        // Destroy previous chart if it exists
        if (this.charts[index]) {
          this.charts[index].destroy();
        }

        // Create a new chart and store it in the charts array
        this.charts[index] = new Chart(canvasElement, {
          type: 'bar',
          data: {
            labels: Object.keys(answerCounts),
            datasets: [{
              label: label,
              data: Object.values(answerCounts),
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      });
    }, 0);
  }
  

  collectAnswersForQuestion(label: string): string[] {
    const answers: string[] = [];
    this.filteredData.forEach(submission => {
      const answer = this.getAnswer(submission, label);
      if (answer) {
        answers.push(...answer.split(', '));
      }
    });
    return answers;
  }

  countAnswers(answers: string[]): Record<string, number> {
    return answers.reduce((acc, answer) => {
      acc[answer] = (acc[answer] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  transformDataToArray(data: any): any[] {
    return Object.values(data);
  }

  extractQuestionLabels(): void {
    const questionLabelsMap = new Map<string, string>();

    for (const submission of this.data) {
      for (const questId in submission.questions) {
        const question = submission.questions[questId];
        questionLabelsMap.set(questId, question.questionLabel);
      }
    }

    this.questionLabels = Array.from(questionLabelsMap.values());
  }

  populateDropdownData(): void {
    this.dropdownData = [...this.questionLabels,'created_at'];
  }

  getAnswer(submission: any, label: string): string {
    for (const questId in submission.questions) {
      const question = submission.questions[questId];
      if (question.questionLabel === label) {
        const answers = Object.values(question.answers).map((answer: any) => this.convertValueToString(answer.data.value));
        return answers.join(', ');
      }
    }
    return '';
  }

  convertValueToString(value: any): string {
    if (Array.isArray(value)) {
      return value.join(', ');
    } else if (typeof value === 'object' && value !== null) {
      return Object.entries(value)
        .map(([key, val]) => `${key}:${val}`)
        .join(', ');
    } else {
      return String(value);
    }
  }

  updateFilterLabel(event: any, index: number): void {
    this.filters[index].label = event.target.value;
  }

  updateFilterValue(event: any, index: number): void {
    this.filters[index].value = event.target.value;
  }

  addFilter(): void {
    this.filters.push({ label: '', value: '' });
  }

  removeFilter(index: number): void {
    this.filters.splice(index, 1);
  }

  applyFilters(): void {
    
    this.filteredData = this.data.filter(submission => {
      return this.filters.every(filter => {
        if (!filter.label || !filter.value) {
          return true;
        }
        const selectedFilters = filter.value.toLowerCase().split(',').map(f => f.trim()).filter(f => f);
        
        if (filter.label === 'created_at') {
          const submissionDate = new Date(submission.created_at).toISOString().toLowerCase();
          return selectedFilters.every(f => submissionDate.includes(f));
        } else {
          const answer = this.getAnswer(submission, filter.label).toLowerCase();
          return selectedFilters.every(f => answer.includes(f));
        }
      });
    });
   
  }

  async saveCSVFile(): Promise<void> {
    try {
      const blob = await this.createCSVFile(this.filteredData);
      saveAs(blob, 'responses.csv');
      console.log('CSV file created and downloaded successfully.');
    } catch (error) {
      console.error('Error creating CSV file:', error);
    }
  }

  async createCSVFile(data: any[]): Promise<Blob> {
    const headers = ['created_at', 'respondant_email', ...this.questionLabels];
    let csvContent = headers.join(',') + '\n';
  
    for (const submission of data) {
      const row = [submission.created_at, submission.user_email];
      this.questionLabels.forEach((label) => {
        const answer = this.getAnswer(submission, label) || '';
        row.push(this.escapeCSVValue(answer));
      });
  
      csvContent += row.join(',') + '\n';
    }
  
    const blob = new Blob([`\uFEFF${csvContent}`], { type: 'text/csv;charset=utf-8' });  // BOM added for UTF-8
    return blob;
  }
  

  escapeCSVValue(value: string): string {
    if (value.includes(',')) {
      return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
  }
}
