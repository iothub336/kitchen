from django.db import models

# Create your models here.
class AddArea(models.Model):
    area=models.CharField(max_length=50,null=True,blank=True)
   
    def __str__(self) :
        return self.area