// class User
//   include Mongoid::Document
//   include Mongoid::Timestamps
//   include ActiveModel::SecurePassword

//   before_update :check_password

//   has_secure_password

//   field :first_name, type: String
//   field :last_name, type: String
//   field :email, type: String
//   field :admin?, type: Boolean, default: false
//   field :can_edit?, type: Boolean, default: true
//   field :active?, type: Boolean, default: true
//   field :reset_password?, type: Boolean, default: true
//   field :password_digest, type: String

//   validates :first_name, :last_name, :email, presence: true
//   validates :email, uniqueness: true
//   validates :password ,length: { minimum: 2 }, :on => :create
//   validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i, :message => "is not a valid email address"
//   validates :password, confirmation: true

//   def full_name
//     "#{self.first_name} #{self.last_name}"
//   end

//   private

//   def check_password
//     is_ok = self.password.nil? || self.password.empty? || self.password.length >= 2
//     self.errors[:password] << "Password is too short (minimum is 2 characters)" unless is_ok
//     return is_ok
//   end

// end