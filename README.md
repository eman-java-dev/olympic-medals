# Olympic Medals

This project is a simple Angular application designed to explore and visualize Olympic medal data.

##  Description
The application allows you to view and manage data related to Olympic medals. It includes basic features like data display, CSV export, and navigation between different sections of the app.

##  Functionality
- Display a list of Olympic medals.
- Export medal data to CSV format.
- Responsive navigation bar.
- Organized project structure with Angular best practices.

##  Build
To build the project for production, run:
```bash
ng build
```
The build artifacts will be stored in the `dist/` directory. The production build is optimized for performance and speed.

## Running Unit Tests
This project uses [Karma](https://karma-runner.github.io) for unit testing.  
To execute the unit tests, run:
```bash
ng test
```

##  Example Test
Here’s an example of a unit test included in the project:

```typescript
it('should create the app', () => {
  const fixture = TestBed.createComponent(AppComponent);
  const app = fixture.componentInstance;
  expect(app).toBeTruthy();
});
```

##  Author
Developed by **Eman ABDULLGADER** as part of a learning journey with **Angular** and **GitHub** integration,  
within the training program at **OpenClassrooms**.


