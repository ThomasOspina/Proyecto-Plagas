from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from django.contrib.auth.hashers import make_password

class UsuarioManager(BaseUserManager):
    def create_user(self, cedula, correo=None, password=None, **extra_fields):
        if not cedula:
            raise ValueError("El usuario debe tener una cédula")

        rol = extra_fields.get('rol', '')

        if rol != 'campesino' and not correo:
            raise ValueError("El usuario debe tener un correo si no es campesino")

        correo = self.normalize_email(correo) if correo else None
        user = self.model(cedula=cedula, correo=correo, **extra_fields)

        if password:
            user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, cedula, correo, password=None, **extra_fields):
        # Puedes dejar esto si quieres seguir creando superusuarios con privilegios personalizados
        extra_fields.setdefault('is_staff', True)
        return self.create_user(cedula, correo, password, **extra_fields)

class Usuario(AbstractBaseUser):
    id_usuario = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=75)
    correo = models.EmailField(max_length=100, unique=True, blank=True, null=True)
    telefono = models.CharField(max_length=20)
    rol = models.CharField(max_length=50)
    cedula = models.CharField(max_length=10, unique=True) 
    password = models.CharField(max_length=128, null=True, blank=True)

    # Opcional si no usas autenticación basada en staff
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'cedula'
    USER_ID_FIELD = 'id_usuario'

    objects = UsuarioManager()

    class Meta:
        managed = False
        db_table = 'Usuario'

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        from django.contrib.auth.hashers import check_password
        return check_password(raw_password, self.password)

    @property
    def contraseña(self):
        return self.password








